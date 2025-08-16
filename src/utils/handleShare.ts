import { Interface__Blog } from "@/constants/interfaces";

export function handleShareBlog(blog: Interface__Blog) {
  if (navigator.share) {
    navigator
      .share({
        title: blog?.title,
        text: blog?.description,
        url: window.location.href,
      })
      .then(() => {
        console.log("Berhasil dishare");
      })
      .catch((err) => {
        console.error("Gagal share:", err);
      });
  } else {
    alert("Browser belum support Web Share");
  }
}
