export default function BoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <h1>Board</h1> {children}
    </>
  );
}
