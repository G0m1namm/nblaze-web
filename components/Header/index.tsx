import { Fragment } from 'react'

export default function Header() {
  return (
    <Fragment>
      <header className="fixed left-0 top-0 z-50 flex w-full justify-center">
        <div className="em:px-5">
          <span className="inline-block uppercase fluid-lg em:mt-5">
            n&apos;blaze
          </span>
        </div>
      </header>
    </Fragment>
  )
}
