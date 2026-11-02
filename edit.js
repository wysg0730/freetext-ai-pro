export async function onRequestPost({ request, env }) {
  if (!env.OPENAI_API_KEY) return Response.json({error:"Cloudflare 尚未设置 OPENAI_API_KEY。"}, {status:500});
  try {
    const f = await request.formData(), image=f.get("image"), mask=f.get("mask"), prompt=f.get("prompt");
    if (!(image instanceof File) || !(mask instanceof File) || typeof prompt!=="string") return Response.json({error:"缺少图片、蒙版或编辑说明。"},{status:400});
    if(image.size>20*1024*1024 || mask.size>4*1024*1024) return Response.json({error:"图片最大 20MB，蒙版最大 4MB。"},{status:413});
    const body=new FormData(); body.append("model","gpt-image-2.5-sunburst");body.append("image",image,"source.png");body.append("mask",mask,"mask.png");body.append("prompt",prompt.slice(0,30000));body.append("quality","high");body.append("output_format","png");
    const r=await fetch("https://api.openai.com/v1/images/edits",{method:"POST",headers:{Authorization:`Bearer ${env.OPENAI_API_KEY}`},body});
    const d=await r.json();if(!r.ok)return Response.json({error:d?.error?.message||`OpenAI API 错误 ${r.status}`},{status:r.status});
    const b64=d?.data?.[0]?.b64_json;if(!b64)return Response.json({error:"AI 没有返回图片，请重试。"},{status:502});
    return Response.json({image:b64},{headers:{"Cache-Control":"no-store"}});
  } catch(e){return Response.json({error:e.message||"服务器处理失败。"},{status:500})}
}