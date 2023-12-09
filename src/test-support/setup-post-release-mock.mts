import { vi } from "vitest";
import { getPackageName } from "./get-package-name.js";

vi.doMock("@this-package", async () => await import(getPackageName()));
