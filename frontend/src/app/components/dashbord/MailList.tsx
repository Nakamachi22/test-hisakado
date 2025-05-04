import { useEffect, useState } from 'react'
import { useFetchMails } from '@/features/mail/hooks/useFetchMails'

interface Mail {
  id: string
  subject: string
  from: string
  receivedDateTime: string
}

export const MailList = () => {
  const accessToken = sessionStorage.getItem("accessToken");
  const { mails, loading, error } = useFetchMails(accessToken)
  const [sortedMails, setSortedMails] = useState<Mail[]>([])

  useEffect(() => {
    if (mails) {
      const sorted = [...mails].sort(
        (a, b) => new Date(b.receivedDateTime).getTime() - new Date(a.receivedDateTime).getTime()
      )
      setSortedMails(sorted)
    }
  }, [mails])

  if (loading) return <div>読み込み中...</div>
  if (error) return <p>❌ エラーが発生しました: {error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">📬 未読メール一覧</h2>
      <ul className="space-y-2">
        {sortedMails.map((mail) => (
          <li key={mail.id} className="border rounded-xl p-4 shadow-md">
            <div className="font-semibold">件名: {mail.subject}</div>
            <div className="text-sm text-gray-600">差出人: {mail.from}</div>
            <div className="text-xs text-gray-500">
              受信日時: {new Date(mail.receivedDateTime).toLocaleString()}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MailList
