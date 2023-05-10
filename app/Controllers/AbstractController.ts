export default class AbstractController {
    public async setError(session, message) {
        session.flash('errors', { error: message });
    }
}