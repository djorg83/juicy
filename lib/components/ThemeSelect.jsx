const React = require('react');
const PropTypes = require('prop-types');
const FontAwesome = require('react-fontawesome');

const prev = (list, selected) => {
    const currentIndex = list.findIndex(({ value }) => value === selected);
    const newIndex = currentIndex <= 0 ? list.length - 1 : currentIndex - 1;
    return list[newIndex].value;
};

const next = (list, selected) => {
    const currentIndex = list.findIndex(({ value }) => value === selected);
    const newIndex = currentIndex >= list.length - 1 ? 0 : currentIndex + 1;
    return list[newIndex].value;
};

const random = (list, selected, dark) => {
    let result;
    while (!result || result.value === selected || result.dark !== dark) {
        result = list[Math.floor(Math.random() * list.length)];
    }
    return result.value;
};

const Button = ({ onClick, children, title }) => (
    <button
        onClick={onClick}
        style={{ padding: 2 }}
        type="button"
        title={title}
        className="btn btn-link"
    >
        {children}
    </button>
);

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
};

const ThemeSelect = ({
    selectedTheme,
    onSelectTheme,
    themes,
}) => (
    <div>
        <span style={{ display: 'block', fontWeight: 'normal' }}>
            Theme:&nbsp;
        </span>
        <select
            style={{ maxWidth: 185 }}
            value={selectedTheme}
            onChange={(e) => onSelectTheme(e.target.value)}
        >
            {themes.map(({ label, value }) => (
                <option key={`theme-${label}`} value={value}>
                    {label}
                </option>
            ))}
        </select>
        <Button
            onClick={() => onSelectTheme(prev(themes, selectedTheme))}
            title="Previous theme in list"
        >
            <FontAwesome name="chevron-circle-left" style={{ color: '#ddd' }} />
        </Button>
        <Button
            onClick={() => onSelectTheme(next(themes, selectedTheme))}
            title="Next theme in list"
        >
            <FontAwesome name="chevron-circle-right" style={{ color: '#ddd' }} />
        </Button>
        <Button
            onClick={() => onSelectTheme(random(themes, selectedTheme, true))}
            title="Random Dark Theme"
        >
            <FontAwesome name="random" style={{ color: '#6b6b6b' }} />
        </Button>
        <Button
            onClick={() => onSelectTheme(random(themes, selectedTheme, false))}
            title="Random Light Theme"
        >
            <FontAwesome name="random" style={{ color: '#fff' }} />
        </Button>
    </div>
);

ThemeSelect.propTypes = {
    selectedTheme: PropTypes.string.isRequired,
    onSelectTheme: PropTypes.func.isRequired,
    themes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

module.exports = ThemeSelect;
