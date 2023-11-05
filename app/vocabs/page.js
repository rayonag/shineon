

import { supabase } from '../../utils/supabaseClient'
import Auth from './components/Auth'
import Account from './components/Account'


export default async function Home() {
    const { data, error } = await supabase.auth.getSession();
    const { session, user } = data

    return (
        <div className="container" style={{ padding: '50px 0 100px 0' }}>
            {!session ? <Auth /> : <Account key={session.user.id} session={session} />}
        </div>
    )
}