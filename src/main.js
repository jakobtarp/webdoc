import "./style.css";

/* Import af Motion One bibliotek */
import { animate, stagger, inView, scroll, timeline } from "motion";

inView(".tracking-in-expand", () => {
  animate(".tracking-in-expand", { x: [-2000, 0] }, { duration: 2 });
});

inView(".fotogalleryinview", ({ target }) => {
  animate(target.querySelectorAll("img"), { x: [-2000, 0] }, { duration: 1, delay: stagger(1, { start: 0.25 }) });

  return () => {
    animate(target.querySelectorAll("img"), { x: [-2000, 0] }, { duration: 1, delay: stagger(1, { start: 0.25 }) });
  };
});

inView(".mangeelementerinview", () => {
  animate(".mangeelementer1", { x: [-2000, 0] }, { duration: 2 });
  animate(".mangeelementer2", { x: [-1500, 0] }, { duration: 2 });
  animate(".mangeelementer3", { x: [-1000, 0] }, { duration: 2 });
  animate(".mangeelementer4", { x: [-500, 0] }, { duration: 2 });
  animate(".mangeelementer5", { x: [-2000, 0] }, { duration: 2 });
  animate(".mangeelementer6", { x: [2000, 0] }, { duration: 2 });

  return () => {
    animate(".mangeelementer1", { x: [-2000, 0] }, { duration: 2 });
    animate(".mangeelementer2", { x: [-1500, 0] }, { duration: 2 });
    animate(".mangeelementer3", { x: [-1000, 0] }, { duration: 2 });
    animate(".mangeelementer4", { x: [-500, 0] }, { duration: 2 });
    animate(".mangeelementer5", { x: [-2000, 0] }, { duration: 2 });
    animate(".mangeelementer6", { x: [2000, 0] }, { duration: 2 });
  };
});

animate("body", { opacity: [0, 1] }, { duration: 4 });

inView(".box1", () => {
  animate(".box1", { x: [-2000, 0] }, { duration: 3 });
});

inView(".box2", () => {
  animate(".box2", { x: [2000, 0] }, { duration: 3 });
});

inView(".box3", () => {
  animate(".box3", { x: [-2000, 0] }, { duration: 3 });
});

inView(".box4", () => {
  animate(".box4", { y: [-2000, 0] }, { duration: 2 });
});

inView(".box5", () => {
  animate(".box5", { y: [2000, 0] }, { duration: 3 });
});

scroll(animate(".progress", { strokeDasharray: ["0,1", "1,1"] }));

scroll(
  animate(".scrollzoomimg", {
    scale: [1, 1.5],
  }),
  {
    target: document.querySelector(".scrollzoom"),
    offset: ["0.5 0.5", "1 1"],
  }
);

const items = document.querySelectorAll("#horisontalliste li");
scroll(
  animate("#horisontalliste", {
    transform: ["none", `translateX(-${items.length - 1}00vw)`],
  }),
  { target: document.querySelector("#horisontalscrollsection") }
);
