export default function ChargesLayout({
  children,
  dialogs,
}: {
  children: React.ReactNode;
  dialogs: React.ReactNode;
}) {
  return (
    <>
      {children}
      {dialogs}
    </>
  );
}
