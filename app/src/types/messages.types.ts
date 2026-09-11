export type Message ={
    id:string,
    content:string,
    type:'error' | 'info' | 'success'
}

export type AddMessageParams = Omit<Message, "id">;