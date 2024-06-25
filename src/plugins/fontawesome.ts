import { library } from '@fortawesome/fontawesome-svg-core'
import { faBold, faCheck, faClipboard, faCode, faH, faHighlighter, faItalic, faListOl, faListUl, faQuoteLeft, faSquareCheck, faStrikethrough, faSubscript, faSuperscript, faTable, faTerminal, faUnderline } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faSquareCheck, faListOl, faListUl, faCode, faQuoteLeft, faH, faBold, faHighlighter, faItalic, faStrikethrough, faUnderline, faTerminal, faSubscript, faSuperscript, faTable, faClipboard, faCheck)

export {
    FontAwesomeIcon
}