type Props = { title: string; text: string };

export default function Placeholder({ title, text }: Props) {
    return (
        <section className="view active">
            <h1>{title}</h1>
            <p className="muted">{text}</p>
        </section>
    );
}