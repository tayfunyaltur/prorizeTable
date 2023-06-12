const If = ({ test, children }: { test: boolean, children: JSX.Element }) => test ? children : null

export default If