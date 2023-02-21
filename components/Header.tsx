import Image from 'next/image'
import styles from '@/styles/Header.module.css'

export interface HeaderProps {
    children?: React.ReactNode
}

export default function Header({ children }:HeaderProps) {
  return (
    <>
        <header className={styles.header}>
            <div className={styles.navbar}>
                <div className={styles.navContent}>
                    <div className={styles.logoContent}>
                        <Image
                            className={styles.mobileLogo}
                            src="/logo.svg"
                            alt="ViralBrand logo"
                            width={60}
                            height={60}
                            priority
                        />
                        <span className={styles.brand}>ViralBrand</span>
                    </div>
                    <nav className={styles.nav}>
                        <ul className={styles.navList}>
                            <li className='nav--about'>
                                <a href='#about' className={styles.navLink}>
                                    about us
                                </a>
                            </li>
                            <li className='nav--portafolio'>
                                <a href='#portafolio' className={styles.navLink}>
                                    portafolio
                                </a>
                            </li>
                            <li className='nav--services'>
                                <a href='#services' className={styles.navLink}>
                                    services & pricing
                                </a>
                            </li>
                            <li className='nav--contacts'>
                                <a href='#contacts' className={styles.navLink}>
                                    contacts
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
                <Image
                    className={styles.logo}
                    src="/logo.svg"
                    alt="ViralBrand logo"
                    width={80}
                    height={80}
                    priority
                />
            </div>
            <div className={styles.mobileNavbar}>
                <button className={styles.menuButton}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <nav className={styles.mobileNav}>
                    <ul className={styles.mobileNavList}>
                        <li className='nav--about'>
                            <a href='#about' className={styles.navLink}>
                                about us
                            </a>
                        </li>
                        <li className='nav--portafolio'>
                            <a href='#portafolio' className={styles.navLink}>
                                portafolio
                            </a>
                        </li>
                        <li className='nav--services'>
                            <a href='#services' className={styles.navLink}>
                                services & pricing
                            </a>
                        </li>
                        <li className='nav--contacts'>
                            <a href='#contacts' className={styles.navLink}>
                                contacts
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
        <main className={styles.main}>
            {children}
        </main>
    </>
  )
}
