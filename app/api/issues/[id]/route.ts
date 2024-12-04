import authOptions from "@/app/auth/authOptions";
import { issueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
type Params = {
    params: Promise<{id: string}>
}
type Body = z.infer<typeof issueSchema>
export async function PATCH(
    request:NextRequest,
    {params}: Params){

    const session = getServerSession(authOptions);
    if(!session)
        return NextResponse.json({}, {status: 401});    
    const {id} = await params;
    const body: Body = await request.json();
    const validation = issueSchema.safeParse(body);

    if(!validation.success) {
        return NextResponse.json(validation.error.format(), {status: 400});
    };

    const issue = await prisma.issue.findUnique({
        where: {id: parseInt(id)}
    });

    if(!issue)
        return NextResponse.json({error: 'Invalid issue'}, {status: 404});
    
    const updatedIssue = await prisma.issue.update({
        where: {id: issue.id},
        data: {
            title: body.title,
            description: body.description
        }
     });
     return NextResponse.json(updatedIssue); 

};

export async function DELETE(
    request: NextRequest,
    {params}:Params){
        
    const session = getServerSession(authOptions);
    if(!session)
        return NextResponse.json({}, {status: 401});    
    const {id} = await params;
    const issue = await prisma.issue.findUnique({
        where: {id: parseInt(id)}
    });

    if(!issue)
        return NextResponse.json({error: 'Invalid issue'}, {status: 404});

    await prisma.issue.delete({
        where: {id: issue.id}
    });

    return NextResponse.json({});
};