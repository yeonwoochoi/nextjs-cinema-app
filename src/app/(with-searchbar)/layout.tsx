import {ReactNode} from "react";

export default function SearchLayout ({children}: {children: ReactNode}) {
  return (
    <>
      <div>Searchbar Layout</div>
      <div>{children}</div>
    </>
  )
}
