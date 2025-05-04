import Image from "next/image";
import { BiMapPin } from "react-icons/bi";
import { BsInstagram, BsYoutube } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { MdLocalPhone, MdOutlineEmail } from "react-icons/md";

export const Footer = () => {
  return (
    <footer className="bg-[#1C1917] text-gray-300 pt-10 w-full ">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid gap-2">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-white font-bold mb-4">Тусламж</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="hover:text-moto-orange transition-colors"
                >
                  Худалдаа
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-moto-orange transition-colors"
                >
                  Тэмцээн
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-moto-orange transition-colors"
                >
                  Бидний тухай
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-moto-orange transition-colors"
                >
                  Service
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Холбоо барих</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <MdLocalPhone size={16} />
                <span>Утас: 89578282</span>
              </li>
              <li className="flex items-center gap-2">
                <MdOutlineEmail size={16} />
                <a
                  href="mailto:info@moto-shop.com"
                  className="hover:text-moto-orange transition-colors"
                >
                  dorjpeacekeeper7@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <BiMapPin size={16} className="mt-1" />
                <span>1234 Мото зам, Гудамж урд, Улаанбаатар хот</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Биднийг дагах</h3>
            <p className="mb-4">
              Elite Moto Shop нь мотоциклын худалдаа, засвар үйлчилгээ, дагалдах
              хэрэгсэл, онлайн захиалга болон мотоциклын түрээсийн үйлчилгээ
              явуулдаг.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="p-2 bg-moto-gray rounded-full hover:bg-moto-orange transition-colors"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href="#"
                className="p-2 bg-moto-gray rounded-full hover:bg-moto-orange transition-colors"
              >
                <BsInstagram size={20} />
              </a>
              <a
                href="#"
                className="p-2 bg-moto-gray rounded-full hover:bg-moto-orange transition-colors"
              >
                <BsYoutube size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t-[10px] border-[#A8A29E] pt-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">
            © 2025 МОТО. Бүх эрх хуулиар хамгаалагдсан.
          </p>
          <p className="text-sm mt-2 md:mt-0">Зохиогчийн эрхийн тухай</p>
        </div>
      </div>
      <Image
        src={"/elitemoto.png"}
        alt="hi"
        className="w-[100vw] h-auto object-cover"
        width={200}
        height={200}
        quality={100}
      />
    </footer>
  );
};
