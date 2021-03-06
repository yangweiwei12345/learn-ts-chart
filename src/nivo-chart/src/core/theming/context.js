/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { createContext, useContext } from 'react'
import PropTypes from 'prop-types'
import { usePartialTheme } from '../hooks'

export const themeContext = createContext()

// required to preserve equality
const defaultPartialTheme = {}

export const ThemeProvider = ({ theme: partialTheme = defaultPartialTheme, children }) => {
    const theme = usePartialTheme(partialTheme)   // 合并默认主题

    return <themeContext.Provider value={theme}>{children}</themeContext.Provider>
}

ThemeProvider.propTypes = {
    children: PropTypes.node.isRequired,
    theme: PropTypes.object,
}

export const useTheme = () => useContext(themeContext)
