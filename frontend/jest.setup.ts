import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "util";

global.TextEncoder = TextEncoder;
// @ts-expect-error Node's TextDecoder is compatible for testing
global.TextDecoder = TextDecoder;