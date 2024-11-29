import React from 'react'
import IssueForm from '../../_components/IssueForm'
import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{id: string}>
}
export default async function EditIssuePage({params}:Props) {
  const { id } = await params;
  const issue = await prisma.issue.findUnique({
    where: {id: parseInt(id)}
  });
  if(!issue) notFound();
  return (
    <IssueForm issue={issue} />
  )
}
