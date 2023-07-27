import { useTypingEffect } from "@/public/lib/hook/typewriteffect";

export default function TypeWriterEffect({ text, speedText }) {
  const _text = useTypingEffect(text, speedText);
  return <span>{_text}</span>;
}
