import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import AllArtworks from '../pages/AllArtworks';
import ArtworkDetails from '../pages/SingleArtwork';
import CreateArtwork from '../pages/CreateArtworkForm';
import UpdateArtwork from '../pages/UpdateArtworkForm';
import AllArtists from '../pages/AllArtists';
import ArtistDetails from '../pages/SingleArtist';
import CreateArtist from '../pages/CreateArtistForm';
import UpdateArtist from '../pages/UpdateArtistForm';
import AllBlogPosts from '../pages/AllBlogPosts';
import BlogPostDetails from '../pages/SingleBlogPost';
import CreateBlogPost from '../pages/CreateBlogPostForm';
import UpdateBlogPost from '../pages/UpdateBlogPostForm';
import AllUsers from '../pages/AllUsers';
import SearchResults from '../pages/SearchResults';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import UserSettings from '../pages/UserSettings';
import Cart from '../pages/Cart';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

export const AppRoutes = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [usersData, setUsersData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const auth = getAuth();
        const firestore = getFirestore();

        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setCurrentUser(user);
                const usersSnapshot = await getDocs(collection(firestore, 'users'));
                const usersData = usersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setUsersData(usersData);
                setLoading(false);
            } else {
                setCurrentUser(null);
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    const isAdmin = currentUser && usersData.some((user) => user.id === currentUser.uid && user.isAdmin);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Routes>
            {/* Routes for non-signed-in users */}
            {!currentUser && (
                <>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/signin" element={<Signin />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/*" element={<Home />} />
                </>
            )}

            {/* SIGNED IN USER & ADMIN ROUTES */}
            {currentUser && (
                <>

                    {console.log("isAdmin:", isAdmin)}

                    <Route path="/artworks" element={<AllArtworks />} />
                    <Route path="/artwork/:artworkId" element={<ArtworkDetails />} />
                    <Route path="/artists" element={<AllArtists />} />
                    <Route path="/artist/:artistId" element={<ArtistDetails />} />
                    <Route path="/blog" element={<AllBlogPosts />} />
                    <Route path="/blogpost/:blogPostId" element={<BlogPostDetails />} />
                    <Route
                        path="/search"
                        element={<SearchResults searchTerm={searchTerm} />}
                    />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/user/settings" element={<UserSettings />} />
                    <Route path="/user/:username/home" element={<Home />} />
                    <Route path="/logout" element={<Home />} />
                    <Route path="/" element={<Home />} /> 

                    {/* SIGNED IN ADMIN ROUTES */}
                    {currentUser && (
                        <>
                            <Route path="/newartwork" element={<CreateArtwork />} />
                            <Route path="/updateartwork/:artworkId" element={<UpdateArtwork />} />
                            <Route path="/deleteartwork/:artworkId" element={<AllArtworks />} />
                            <Route path="/newartist" element={<CreateArtist />} />
                            <Route path="/updateartist/:artistId" element={<UpdateArtist />} />
                            <Route path="/deleteartist/:artistId" element={<AllArtists />} />
                            <Route path="/newblogpost" element={<CreateBlogPost />} />
                            <Route path="/updateblogpost/:blogPostId" element={<UpdateBlogPost />} />
                            <Route path="/deleteblogpost/:blogPostId" element={<AllBlogPosts />} />
                            <Route path="/users" element={<AllUsers />} />
                            <Route path="/updateuser/:userid" element={<AllUsers />} />
                        </>
                    )}
                </>
            )}

            {currentUser && (
                <>
                    <Route path="/signin" element={<Navigate to="/" replace />} />
                    <Route path="/signup" element={<Navigate to="/" replace />} />
                </>
            )}
        </Routes>
    );
};








