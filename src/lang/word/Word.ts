import { Span } from "../span"

export type Word =
  | Call
  | Local
  | PortPush
  | PortReconnect
  | TypeVar
  | Label
  | NodeRearrange

export type Call = {
  "@type": "Word"
  "@kind": "Call"
  name: string
  span: Span
}

export type Local = {
  "@type": "Word"
  "@kind": "Local"
  name: string
  span: Span
}

export type PortPush = {
  "@type": "Word"
  "@kind": "PortPush"
  nodeName: string
  portName: string
  span: Span
}

export type PortReconnect = {
  "@type": "Word"
  "@kind": "PortReconnect"
  nodeName: string
  portName: string
  span: Span
}

export type TypeVar = {
  "@type": "Word"
  "@kind": "TypeVar"
  name: string
  span: Span
}

export type Label = {
  "@type": "Word"
  "@kind": "Label"
  label: string
  isImportant?: boolean
  span: Span
}

export type NodeRearrange = {
  "@type": "Word"
  "@kind": "NodeRearrange"
  name: string
  input: Array<string>
  output: Array<string>
  span: Span
}
