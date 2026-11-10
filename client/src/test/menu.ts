import { screen, within, type Matcher } from '@testing-library/react';

/**
 * Tìm mục trong bảng thả xuống ribbon đang mở theo `aria-label`, không phụ thuộc vai trò (`button` hay `menuitem`),
 * để làn cloud đổi vai trò mục menu mà test không đỏ.
 */
export const menuItem = (name: Matcher) => within(screen.getByRole('menu')).getByLabelText(name);

/** Mọi mục của bảng thả xuống đang mở, theo thứ tự hiển thị. */
export const menuItems = () => within(screen.getByRole('menu')).getAllByLabelText(/.+/);
