"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
export default function ModalSection (){
      const router = useRouter();
    return(
        <>
        (
            <div className="modal-overlay">
              <div className="modal-content">
                <div className="modal-img">
                  <Image
                    src="/Successful.png"
                    alt="Successful"
                    width={400}
                    height={250}
                    quality={100}
                  />
                </div>
                <h3>Successful</h3>
                <div className="modal-btn-container">
                  <button onClick={() => router.push("/dashboard")}>OK</button>
                </div>
              </div>
            </div>
          )
        </>
    )
}