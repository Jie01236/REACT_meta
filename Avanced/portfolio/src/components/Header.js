import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faLinkedin,
  faMedium,
  faStackOverflow,
} from "@fortawesome/free-brands-svg-icons";
import { Box, HStack } from "@chakra-ui/react";

const socials = [
  {
    icon: faEnvelope,
    url: "mailto: hello@example.com",
  },
  {
    icon: faGithub,
    url: "https://github.com",
  },
  {
    icon: faLinkedin,
    url: "https://www.linkedin.com",
  },
  {
    icon: faMedium,
    url: "https://medium.com",
  },
  {
    icon: faStackOverflow,
    url: "https://stackoverflow.com",
  },
];

const Header = () => {
  const handleClick = (anchor) => () => {
    const id = `${anchor}-section`;
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const [isHidden, setIsHidden] = useState(false); // 控制 Header 是否隐藏
  const lastScrollY = useRef(0); // 记录上一次滚动位置

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY.current) {
      // 向下滚动时隐藏 Header
      setIsHidden(true);
    } else {
      // 向上滚动时显示 Header
      setIsHidden(false);
    }
    lastScrollY.current = currentScrollY; // 更新上一次滚动位置
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll); // 清理事件监听器
    };
  }, []);

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      translateY={0}
      transform={isHidden ? "translateY(-200px)" : "translateY(0)"} // 动态控制 transform
      transitionProperty="transform"
      transitionDuration=".3s"
      transitionTimingFunction="ease-in-out"
      backgroundColor="#18181b"
    >
      <Box color="white" maxWidth="1280px" margin="0 auto">
        <HStack
          px={16}
          py={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <nav>
          <HStack spacing={8}>
              {socials.map((item,index)=> (
      <a key={index} href={item.url} target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={item.icon} size="2x" />
      </a>)
              )}
            </HStack>
          </nav>
          <nav>
            <HStack spacing={8}>
            <a href="/#projects-section" onClick={handleClick('projects-section')}>Projets</a>
            <a href="/#contactme-section" onClick={handleClick('contactme-section')}>Contact Me</a>
            </HStack>
          </nav>
        </HStack>
      </Box>
    </Box>
  );
};
export default Header;
