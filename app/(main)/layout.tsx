import AccountLinks from "../../components/AccountLinks";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AccountLinks />
      {children}
    </>
  );
}
