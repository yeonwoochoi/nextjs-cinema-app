import {ReactNode} from "react";
import Searchbar from "../../components/searchbar";

export default function SearchLayout ({children}: {children: ReactNode}) {
  return (
    <>
      <div>
        <Searchbar />
      </div>
      <div>{children}</div>
    </>
  )
}
