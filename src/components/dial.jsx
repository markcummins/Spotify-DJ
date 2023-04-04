import styles from '@/styles/Dial.module.css'

export default function Dial() {

  return (
    <div className={styles.dial}>
      <div className={styles.freq}>
        <div>AM</div>
        <div className={styles.freqA}>
          <div>54</div>
          <div>60</div>
          <div>70</div>
          <div>80</div>
          <div>100</div>
          <div>120</div>
          <div>140</div>
        </div>
      </div>

      <div className={styles.divider}>
        <div>
          <div className={styles.dividerLead}>0</div>
        </div>
        <div className={styles.dividerLeds}>
          <div></div>
          <div></div>
          <div></div>
          <div>10</div>
          <div></div>
          <div></div>
          <div></div>
          <div>20</div>
          <div></div>
          <div></div>
          <div></div>
          <div>30</div>
          <div></div>
          <div></div>
          <div></div>
          <div>40</div>
          <div></div>
          <div></div>
          <div></div>
          <div>50</div>
          <div></div>
          <div></div>
          <div></div>
          <div>60</div>
          <div></div>
          <div></div>
          <div></div>
          <div>70</div>
        </div>
      </div>
      <div className={styles.freq}>
        <div>FM</div>
        <div className={styles.freqB}>
          <div>88</div>
          <div>92</div>
          <div>96</div>
          <div>100</div>
          <div>103</div>
          <div>106</div>
          <div>108</div>
        </div>
      </div>
    </div>
  )
}

