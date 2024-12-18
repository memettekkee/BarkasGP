import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-mainClr text-anyClr flex justify-between font-sec-oswald px-3 py-1 md:px-10 md:py-2">
            <h1 className="text-xs md:text-base flex flex-col md:flex-row">© 2024 Barkas-GP.<span>&#xA0;Revolutionizing performance, one ride at a time.</span></h1>
            <div className="flex md:flex-row flex-col md:items-center">
                <p className="md:pr-5 text-xs md:text-base text">Product by: Muhammad</p>
                <div className="flex gap-3 pt-1 md:pt-0">
                    <a
                        href="https://www.linkedin.com/in/muhammad-met/"
                        target="_blank"
                        className="h-full flex items-center cursor-pointer">
                        <FaLinkedin className="h-full hover:text-thrdClr" />
                    </a>
                    <a
                        href="https://github.com/memettekkee"
                        target="_blank"
                        className="h-full flex items-center cursor-pointer">
                        <FaGithub className="h-full hover:text-thrdClr" />
                    </a>
                    <a
                        href="https://www.instagram.com/mhmmad_23_/"
                        target="_blank"
                        className="h-full flex items-center cursor-pointer">
                        <FaInstagram className="h-full hover:text-thrdClr" />
                    </a>
                </div>
            </div>
        </footer>
    )
}