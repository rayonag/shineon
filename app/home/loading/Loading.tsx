import styles from "./Home.module.css";
import "./loading.css";
import { Caveat } from "next/font/google";

const caveat = Caveat({ subsets: ["latin"] });
export default function Loading(): React.ReactNode {
    return (
        <div className={caveat.className}>
            <div className={styles.opening}>
                <p className="typewriter">RAY & HOSANNA</p>
                <div className="line"></div>
                <div className="kiran">SHINE ON!</div>
            </div>
        </div>
    );
}
