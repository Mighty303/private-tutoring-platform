import InviteClient from "./InviteClient";

export default async function InvitePage({ params }) {
  const { code } = await params;
  return <InviteClient code={code} />;
}
