export interface IMessagesState {
  items: IMessage[]
  authorList: IAuthor[]
  author?: IAuthor
  isFetching: boolean
  error?: string
}

export interface IMessage {
  id?: string
  dateTime: number
  author: IAuthor
  messageText: string
}

export interface IAuthor {
  id: string
  title: string
  description?: string
}

export interface IMessageGetPayload {
  messageId?: string
  authorId?: string
}
