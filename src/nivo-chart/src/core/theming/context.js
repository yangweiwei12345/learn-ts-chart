import { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import { usePartialTheme } from '../hooks';

export const themeContext = createContext();

const defaultPartialTheme = {};

export const ThemeProvider = ({ theme: partialTheme = defaultPartialTheme, children }) => {
    const theme = usePartialTheme(partialTheme);

    return <themeContext.Provider value={theme}></themeContext.Provider>
}

ThemeProvider.propTypes = {
    children: PropTypes.node.isRequired,
    theme: PropTypes.object
};

export const useTheme = () => useContext(themeContext);