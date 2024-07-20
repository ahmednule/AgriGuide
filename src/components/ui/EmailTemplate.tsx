import * as React from "react";
import {
  Html,
  Head,
  Body,
  Container,
  Heading,
  Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

export const EmailTemplate: React.FC<
  Readonly<{ name: string; email: string; message: string }>
> = ({ name, email, message }) => (
  <Tailwind>
    <Html>
      <Head />
      <Body className="bg-[#262c35]">
        <Container className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-lg">
          <Heading className="text-2xl font-bold text-[#0a0e14]">
            Contact Form Submission
          </Heading>
          <Text className="mt-4 text-slate-600">
            You have a new contact form submission from your portfolio:
          </Text>
          <Text className="font-bold text-slate-800 mt-6">Name:</Text>
          <Text className="text-slate-600">{name}</Text>
          <Text className="font-bold text-slate-800 mt-4">Email:</Text>
          <Text className="text-slate-600">{email}</Text>
          <Text className="font-bold text-slate-800 mt-4">Message:</Text>
          <Text className="text-slate-600">{message}</Text>
        </Container>
      </Body>
    </Html>
  </Tailwind>
);

