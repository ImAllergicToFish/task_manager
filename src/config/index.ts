/**
 * This method returns the server config.
 * By default, it returns the Environment Variables.
 */
export default function getConfig(): typeof process.env {
    return process.env;
}
