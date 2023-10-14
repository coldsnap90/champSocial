import React from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import useSWR from "swr";
import { fetcher } from '../helpers/axios';
import { Row, Col } from "react-bootstrap"
import UpdateProfileForm from "../components/profile/UpdateProfileForm";

function EditProfile() {
    const {profileId} = useParams();
    const profile = useSWR(`/api/user/${profileId}/`,fetcher);

    return(
        <Layout hasNavigationBack>
             {profile.data ? (
             <Row className="justify-content-evenly">
                <Col sm={9}>
                    <UpdateProfileForm profile={profile.data} />
                </Col>
             </Row>
             ) : (
             <div>Loading...</div>
             )}
        </Layout>
    )

}

export default EditProfile;