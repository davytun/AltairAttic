export interface ServiceFaq {
  Question: string;
  Answer: string;
}

export interface ServiceExplain {
  e_p1: string;
  e_p2: string;
}

export interface ServiceData {
  name: string;
  url: string;
  detail: string;
  define: string;
  image: string;
  video?: string;
  additionalInfo: string[];
  explain: ServiceExplain[];
  choose: string;
  success: string;
  Q1: ServiceFaq;
  Q2: ServiceFaq;
  Q3: ServiceFaq;
}

const wordSlid: ServiceData[] = [
  {
    name: "Smart Home Automation",
    url: "/smart-home-automation",
    detail: "Transform Your Living Space",
    define:
      "We specialize in creating intelligent living environments that provide comfort, security, and energy efficiency.",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=1200",
    video: "/Home Automation.mp4",
    additionalInfo: [
      "Home Security Systems: Automated locks, cameras, and alarm systems.",
      "Lighting Control: Smart lighting systems that adapt to your schedule.",
      "Climate Control: Automated thermostats and HVAC systems for optimal comfort.",
      "Entertainment Systems: Integrated audio and video solutions.",
      "Voice Assistants: Seamless integration with Alexa, Google Assistant, and more.",
    ],
    explain: [
      {
        e_p1: "At Altair Attic Limited, our smart home automation solutions transform your living space into an intelligent, connected environment. We integrate advanced technologies to control lighting, climate, entertainment systems, and security, all accessible through your smartphone or voice commands. Our systems provide unparalleled convenience, allowing you to manage your home effortlessly and efficiently, whether you’re at home or away.",
        e_p2: "Beyond convenience, our smart home automation enhances security with features like smart locks and real-time surveillance. Our systems learn your preferences and routines, optimizing energy usage and reducing utility bills. As technology evolves, we ensure our solutions remain accessible and affordable, making modern living a reality for homeowners seeking to upgrade their spaces.",
      },
    ],
    choose:
      "Experience intelligent living with our advanced, secure, and energy-efficient smart home solutions tailored to your lifestyle.",
    success:
      "Empowering your success with intelligent, secure, and energy-efficient smart home solutions, tailored to enhance your lifestyle and convenience",
    Q1: {
      Question: "What is smart home automation?",
      Answer:
        "Smart home automation involves using technology to control and automate household systems like lighting, security, and climate control for enhanced convenience and efficiency.",
    },
    Q2: {
      Question: "How can smart home automation benefit me?",
      Answer:
        "It offers increased convenience, improved security, energy savings, and the ability to control your home remotely.",
    },
    Q3: {
      Question: "Is smart home automation difficult to install?",
      Answer:
        "Our solutions are designed for easy installation, and our team provides full support to ensure a seamless setup.",
    },
  },
  {
    name: "Software Development",
    url: "/software-development",
    detail: "Custom Solutions for Your Business Needs",
    define:
      "Our software development team delivers tailored applications to meet your specific requirements.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200",
    additionalInfo: [
      "Web Development: Responsive websites and web applications.",
      "Mobile App Development: iOS and Android apps.",
      "Desktop Applications: Custom software for various platforms.",
      "Cloud Solutions: Scalable cloud applications and services.",
      "API Integration: Connecting your software with third-party services.",
    ],
    explain: [
      {
        e_p1: "Altair Attic Limited excels in software development, crafting bespoke applications and systems tailored to meet specific needs. Our process encompasses requirement analysis, system design, coding, testing, and maintenance, ensuring high-quality, reliable software. From simple mobile apps to complex enterprise systems, we deliver solutions that address user requirements and drive business success.",
        e_p2: "Staying ahead in the dynamic field of software development, we embrace agile methodologies and DevOps practices for collaboration and rapid delivery. Our team stays updated with the latest trends, including AI, cloud computing, and cybersecurity, to provide cutting-edge solutions. At Altair Attic Limited, we are committed to innovation and excellence, creating impactful software that meets the evolving demands of our clients.",
      },
    ],
    choose:
      "We deliver innovative, scalable software solutions that drive your business forward with precision and creativity.",
    success:
      "Empowering your success through innovative, scalable software solutions that drive your business forward with precision, creativity, and reliability.",
    Q1: {
      Question: "What types of software development services do you offer?",
      Answer:
        "We offer custom applications, enterprise software, mobile apps, and more, tailored to meet your specific needs.",
    },
    Q2: {
      Question: "How do you ensure the quality of your software?",
      Answer:
        "We follow rigorous testing and quality assurance processes to deliver reliable and high-performing software solutions.",
    },
    Q3: {
      Question:
        "Can you develop software for both small businesses and large enterprises?",
      Answer:
        "Yes, we cater to businesses of all sizes, providing scalable solutions that grow with your needs.",
    },
  },
  {
    name: "IoT and Embedded Systems Integration",
    url: "/iot-embedded-systems",
    detail: "Connecting the World Around You",
    define:
      "We provide IoT and embedded systems solutions that bring intelligence to your devices and systems.",
    image: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&q=80&w=1200",
    additionalInfo: [
      "Device Design and Prototyping: From concept to creation.",
      "Firmware Development: Custom firmware for your devices.",
      "IoT Platforms: Integration with popular IoT platforms like AWS IoT, Azure IoT, and Google Cloud IoT.",
      "Sensor Integration: Connecting various sensors for data collection and automation.",
      "Data Analytics: Turning IoT data into actionable insights.",
    ],
    explain: [
      {
        e_p1: "Altair Attic Limited specializes in IoT and embedded systems integration, connecting devices and systems to the internet for seamless communication and interaction. Our expertise enables the collection and analysis of data from multiple sources, facilitating smarter decision-making and automation. We design and implement embedded systems that perform dedicated functions within larger systems, enhancing efficiency and functionality.",
        e_p2: "Our IoT and embedded systems integration services revolutionize industries such as healthcare, manufacturing, and transportation. We enable real-time monitoring, predictive maintenance, and efficient resource management. For instance, our solutions in healthcare monitor patient vitals and alert medical professionals to anomalies. As the number of connected devices grows, Altair Attic Limited remains at the forefront, providing innovative solutions for a connected world.",
      },
    ],
    choose:
      "Our seamless IoT and embedded systems integration enhances connectivity, streamlines operations, and provides real-time data insights.",
    success:
      "Empowering your success by seamlessly integrating IoT and embedded systems, enhancing connectivity, streamlining operations, and providing real-time data insights.",
    Q1: {
      Question: "What is IoT and embedded systems integration?",
      Answer:
        "It involves connecting physical devices to the internet and integrating them with embedded systems to enable real-time data exchange and automation.",
    },
    Q2: {
      Question: "What industries can benefit from IoT integration?",
      Answer:
        "Industries such as smart cities, healthcare, manufacturing, and agriculture can greatly benefit from IoT integration.",
    },
    Q3: {
      Question: "How secure are your IoT solutions?",
      Answer:
        "We prioritize security in all our IoT solutions, implementing robust measures to protect data and devices.",
    },
  },
];

export default wordSlid;
