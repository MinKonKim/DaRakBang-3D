export async function uploadModelFile(file: File): Promise<string> {
  const formData = new FormData()
  formData.append("file", file)

  const res = await fetch("/api/models", { method: "POST", body: formData })
  const body = await res.json()

  if (!res.ok) throw new Error(body.error ?? "파일 업로드 실패")

  return body.fileUrl as string
}
