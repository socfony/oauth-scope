import { generator } from "./builder";

const prefix = <const>"user";
const original = <const>["read", "update:username"];
const children = <const> {
    profile: ["read", "update"],
    security: ["read", "read:password", "read:phone", "read:secret", "update:phone", "update:password", "update:secret"]
};

export const user = generator(prefix, original, children);
