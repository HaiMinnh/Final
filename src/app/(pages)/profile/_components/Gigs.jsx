'use client';
import {useEffect, useState} from 'react';
import GigCard from './GigCard';
import {getJobsUserHasHiredApi} from '@/app/action/service/userApi';

const Gigs = () => {
    const [gigs, setGigs] = useState([]);
    useEffect(() => {
        const token = localStorage.getItem('fiverrUserToken');

        if (!token) {
            throw Error('Invalid Token!');
        }
        const fetchGigs = async () => {
            const data = await getJobsUserHasHiredApi(token);

            setGigs(data);
        };
        fetchGigs().catch(console.error);
    }, []);

    console.log('gigs', gigs);
    return (
        <div className="gigs">
            <div className="gigs_card_top">
                <div className="gigs_card">
                    <span className="col-lg-8 col-xl-6 col-8 col-sm-6">
                        It seems that you don't have any active Gigs.
                    </span>
                    <button className="btn col-lg-3 col-xl-3 col-4 col-sm-4">
                        Create a new Gig
                    </button>
                </div>
            </div>
            {gigs.length !== 0 && (
                <div className="gigs_card_bottom">
                    {gigs.map((gig) => {
                        return <GigCard key={gig.id} {...gig} />;
                    })}
                </div>
            )}
        </div>
    );
};

export default Gigs;
