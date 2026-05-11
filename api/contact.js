import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, email, message } = req.body;

  try {
    const data = await resend.emails.send({
      from: 'DeepMine Web <onboarding@resend.dev>', // 나중에 도메인 연결 시 수정 가능
      to: ['kwpark@deepmine.co.kr'], // 수신할 이메일 주소
      subject: `[홈페이지 문의] ${name}님의 문의입니다.`,
      html: `
        <h3>새로운 홈페이지 문의가 접수되었습니다.</h3>
        <p><strong>성함/회사명:</strong> ${name}</p>
        <p><strong>이메일:</strong> ${email}</p>
        <p><strong>내용:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    return res.status(200).json({ message: 'Success', data });
  } catch (error) {
    return res.status(500).json({ message: 'Error', error: error.message });
  }
}
