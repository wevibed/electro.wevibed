export default {
 async fetch(request, env) {
  const cors={ "Access-Control-Allow-Origin":"*", "Access-Control-Allow-Methods":"GET,POST,OPTIONS", "Access-Control-Allow-Headers":"Content-Type" };
  if(request.method==="OPTIONS") return new Response(null,{headers:cors});
  const url=new URL(request.url);
  if(url.pathname==="/api/health") return Response.json({ok:true,store:"electro-house"},{headers:cors});
  if(url.pathname==="/api/orders" && request.method==="POST"){
   const body=await request.json();
   if(!body.customer?.name || !body.customer?.phone || !Array.isArray(body.items) || !body.items.length) return Response.json({error:"Invalid order"},{status:400,headers:cors});
   const id=crypto.randomUUID(), now=new Date().toISOString();
   await env.DB.prepare("INSERT INTO orders (id, customer_name, customer_phone, fulfilment, address, payment_method, subtotal, delivery_fee, total, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?)").bind(id,body.customer.name,body.customer.phone,body.fulfilment||"delivery",body.address||"",body.paymentMethod||"",body.subtotal,body.deliveryFee,body.total,now).run();
   const stmt=env.DB.prepare("INSERT INTO order_items (id, order_id, product_name, unit_price, quantity, variant) VALUES (?, ?, ?, ?, ?, ?)");
   for(const item of body.items) await stmt.bind(crypto.randomUUID(),id,item.name,item.price,item.quantity,item.variant||"").run();
   return Response.json({ok:true,orderId:id,reference:id.slice(0,8).toUpperCase()},{headers:cors});
  }
  return Response.json({error:"Not found"},{status:404,headers:cors});
 }
};