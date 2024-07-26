import { transporter } from "../../configs/mail";

export async function sendMail (to: string, title: string, body: string ) {
    const info = await transporter.sendMail({
        from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
        to: `${to}`, // list of receivers
        subject: `${title}`, // Subject line
        html: `${body}`, // html body
      });
    
      console.log("Message sent: %s", info.messageId);
 
}