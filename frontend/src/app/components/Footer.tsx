import Image from "next/image";
import Link from "next/link";
import { BiMapPin } from "react-icons/bi";
import { BsInstagram, BsYoutube } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { MdLocalPhone, MdOutlineEmail } from "react-icons/md";

export const Footer = () => {
  return (

    <footer className="bg-[#1C1917] text-gray-300 pt-10 w-full">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid gap-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Help Links */}
          <nav aria-label="Footer Navigation">

            <h3 className="text-white font-bold mb-4">Тусламж</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/bike"
                  className="hover:text-moto-orange transition-colors"
                >
                  Худалдаа
                </Link>
              </li>
              <li>
                <Link
                  href="/tournament"
                  className="hover:text-moto-orange transition-colors"
                >
                  Тэмцээн
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-moto-orange transition-colors"
                >
                  Бидний тухай
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-moto-orange transition-colors"
                >
                  Үйлчилгээ
                </Link>
              </li>
            </ul>
          </nav>

          {/* Contact Info */}
          <address className="not-italic">
            <h3 className="text-white font-bold mb-4">Холбоо барих</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <MdLocalPhone size={18} />
                <span>Утас: 8957-8282</span>
              </li>
              <li className="flex items-center gap-2">
                <MdOutlineEmail size={18} />
                <a
                  href="mailto:dorjpeacekeeper7@gmail.com"
                  className="hover:text-moto-orange transition-colors"
                >
                  dorjpeacekeeper7@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <BiMapPin size={18} className="mt-1" />
                <span>
                  1234 Мото зам, Гудамж урд, <br /> Улаанбаатар хот
                </span>
              </li>
            </ul>
          </address>

          {/* Social Media */}
          <div>
            <h3 className="text-white font-bold mb-4">Биднийг дагах</h3>
            <p className="mb-4 text-sm leading-relaxed">
              Elite Moto Shop нь мотоциклын худалдаа, засвар үйлчилгээ, дагалдах
              хэрэгсэл, онлайн захиалга болон түрээсийн үйлчилгээ үзүүлдэг.
            </p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="p-2 bg-moto-gray rounded-full hover:bg-moto-orange transition-colors"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="p-2 bg-moto-gray rounded-full hover:bg-moto-orange transition-colors"
              >
                <BsInstagram size={20} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="p-2 bg-moto-gray rounded-full hover:bg-moto-orange transition-colors"
              >
                <BsYoutube size={20} />
              </a>
            </div>
          </div>
        </div>


        {/* Bottom Bar */}
        <div className="border-t border-[#A8A29E] pt-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>© 2025 МОТО. Бүх эрх хуулиар хамгаалагдсан.</p>
          <p className="mt-2 md:mt-0">Зохиогчийн эрхийн тухай</p>

        </div>
      </div>

      {/* Decorative Footer Image */}
      <Image
        src="/elitemoto.png"
        alt="Elite Moto Footer Banner"
        width={1920}
        height={300}
        quality={90}
        className="w-full h-auto object-cover mt-6"
        priority
      />
    </footer>
  );
};
