import { createDirectus, rest, authentication } from "@directus/sdk"
import { API_URL } from "../environment"

/**
 * Global directus configuration with rest api
 */
const directus = createDirectus(API_URL)
  .with(authentication("cookie", { credentials: "include", autoRefresh: true }))
  .with(rest({ credentials: "include" }))

export default directus
