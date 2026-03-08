import { template1 } from "./templates/template1";
import { template2 } from "./templates/template2";
import { template3 } from "./templates/template3";
import { template4 } from "./templates/template4";
import { template5 } from "./templates/template5";

const templates = [template1, template2, template3, template4, template5];

export function buildHTML(content, vibe = "bold") {
  const pick = templates[Math.floor(Math.random() * templates.length)];
  return pick(content, vibe);
}
