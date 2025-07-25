"use client";
import React from "react";
import Navbar2 from "../components/Navbar/Navbar2";
import Image from "next/image";
import { useRouter } from "next/navigation";

const TEMPLATES = [
  {
    templateId: 1,
    templateName: "Digital South",
    templateDescription: "Digital South",
    templateImage: "/templates/template1.png",
  },
  {
    templateId: 2,
    templateName: "Digital South with Hindustan College of Arts and Science",
    templateDescription:
      "Digital South with Hindustan College of Arts and Science",
    templateImage: "/templates/template2.png",
  },
  {
    templateId: 3,
    templateName: " Ethiopian Academy of Sciences",
    templateDescription: " Ethiopian Academy of Sciences",
    templateImage: "/templates/template3.png",
  },
];

const TemplateCard = ({ template }) => {
  const router = useRouter();
  return (
    <div
      className="bg-white rounded-md shadow-xl p-4"
      role="button"
      onClick={() => {
        router.push(`/mint-sbt/${template.templateId}`);
      }}
    >
      <Image
        src={template.templateImage}
        alt={template.templateName}
        width={360}
        height={240}
        className="w-full object-cover my-2"
      />
      <h2 className="text-2xl font-bold text-black">{template.templateName}</h2>
    </div>
  );
};

const Templates = () => {
  return (
    <div className="min-h-screen">
      <Navbar2 />
      <div className=" flex gap-8 h-[100vh] bg-gradient-to-br from-blue-50 to-indigo-50 px-4 py-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold text-black my-8">Templates</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {TEMPLATES.map((template) => (
              <TemplateCard key={template.templateId} template={template} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Templates;
