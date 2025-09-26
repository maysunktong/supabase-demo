import AccountLinks from "../../components/AuthLink";

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
