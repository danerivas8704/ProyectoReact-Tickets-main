// src/components/Layout.tsx
import { Sidebar } from "./Sidebar";
import { Container } from "reactstrap";

interface Props {
  children: React.ReactNode;
}

export function Layout({ children }: Props) {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <Container fluid style={{ marginLeft: "240px", padding: "20px" }}>
        {children}
      </Container>
    </div>
  );
}
