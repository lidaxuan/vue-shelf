import treeLeft from "../../images/treeLeft.png"
import treeCen from "../../images/tree.png"
import treeRight from "../../images/treeRight.png"
import npcImg from "../../images/npc_new.png"
import npcMove from "../../images/npcMove.png"
import npcDie from "../../images/npcDie.png"
import bgImg from "../../images/bg.jpg";

export const IMAGES = {
  treeLeft,
  treeCen,
  treeRight,
  npcImg,
  npcMove,
  npcDie,
  bgImg
}

export const baseConfig = {
  width: window.innerWidth, //300,
  height: window.innerHeight, // 150
  baseBlood: 60000,
  treeNum: 5, // 默认生成15段
  beforeTreeNum: 2, // 默认前2个是中间树段,保证一上来不会死
}